import axios from 'axios';

export type Term = {
    term: string;
    context?: string;
    reference?: string;
    plural?: string;
    comment?: string;
    tags?: string[] | string;
};

export type Translation = {
    term: string;
    context?: string;
    translation: { content: string | Record<string, string> };
};

export type PushConfig = {
    apiUrl: string;
    apiToken: string;
    projectId: string;
    lang: string;
    batchSize?: number;
    overwrite?: boolean;
};

type PoEditorResponse<T = unknown> = {
    response: {
        status: 'success' | 'fail';
        code?: number | string;
        message?: string;
    };
    result?: T;
};

type FormEncodable =
    | string
    | number
    | boolean
    | null
    | undefined
    | Record<string, unknown>
    | unknown[];

export type EntryInput = {
    term: string;
    context?: string;
    reference?: string;
    plural?: string;
    comment?: string;
    tags?: string[];
    translation?: { content?: string | Record<string, string> };
};

export type GroupedJson = Record<string, Record<string, EntryInput>>;

const post = async <T = unknown>(
    apiUrl: string,
    endpoint: string,
    form: Record<string, FormEncodable>
): Promise<PoEditorResponse<T>> => {
    const url = `${apiUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(form)) {
        params.append(k, typeof v === 'string' ? v : JSON.stringify(v ?? ''));
    }
    const res = await axios.post<PoEditorResponse<T>>(url, params.toString(), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    if (res.data?.response?.status !== 'success') {
        const code = res.data?.response?.code;
        const message = res.data?.response?.message;
        throw new Error(`POEditor error: ${code} ${message}`);
    }
    return res.data;
};

export function buildPayloadsFromGroupedJson(json: GroupedJson) {
    const terms: Term[] = [];
    const translations: Translation[] = [];

    for (const cat of Object.keys(json)) {
        const group = json[cat];
        for (const key of Object.keys(group)) {
            const entry = group[key];

            terms.push({
                term: entry.term,
                context: entry.context || '',
                reference: entry.reference || '',
                plural: entry.plural || '',
                comment: entry.comment || '',
                ...(entry.tags && entry.tags.length ? {tags: entry.tags} : {}),
            });

            translations.push({
                term: entry.term,
                context: entry.context || '',
                translation: {content: entry.translation?.content ?? ''},
            });
        }
    }

    return {terms, translations};
}

const chunk = <T, >(arr: T[], size = 100): T[][] =>
    Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

export async function pushToPoeditor(json: GroupedJson, cfg: PushConfig) {
    const {terms, translations} = buildPayloadsFromGroupedJson(json);
    const batch = cfg.batchSize ?? 100;

    for (const part of chunk(terms, batch)) {
        await post(cfg.apiUrl, 'terms/add', {
            api_token: cfg.apiToken,
            id: cfg.projectId,
            data: part,
        });
    }

    const endpoint = cfg.overwrite ? 'translations/update' : 'translations/add';
    for (const part of chunk(translations, batch)) {
        await post(cfg.apiUrl, endpoint, {
            api_token: cfg.apiToken,
            id: cfg.projectId,
            language: cfg.lang,
            data: part,
        });
    }

    return {terms: terms.length, translations: translations.length, lang: cfg.lang};
}