import axios from 'axios';

export type PullConfig = {
    apiUrl: string;
    apiToken: string;
    projectId: string;
    minPercentage?: number;
    onlyWithTranslations?: boolean;
};

type ApiBodyBase = { api_token: string; id: string; language?: string };

export type LanguageInfo = {
    code: string;
    percentage: number;
    translations: number;
};

type PoEditorResponse<T> = {
    response: {
        status: 'success' | 'fail';
        code?: number | string;
        message?: string;
    };
    result: T;
};

type FormValue = string | number | boolean | null | undefined;
type FormPayload = Record<string, FormValue>;

export type ProductTerm = {
    term: string;
    context?: string | null;
    plural?: string | null;
    created?: string | null;
    updated?: string | null;
    translation?: {
        content?: string | null;
        fuzzy?: number | boolean | null;
        proofread?: number | boolean | null;
        updated?: string | null;
    } | null;
    reference?: string | null;
    tags?: string[] | null;
    comment?: string | null;
};

export type NormalizedEntry = {
    term: string;
    context: string;
    plural: string;
    created: string;
    updated: string;
    translation: {
        content: string;
        fuzzy: number;
        proofread: number;
        updated: string;
    };
    reference: string;
    tags: string[];
    comment: string;
};

export type GroupedTerms = Record<string, Record<string, NormalizedEntry>>;

const post = async <T>(
    apiUrl: string,
    endpoint: string,
    form: FormPayload
): Promise<T> => {
    const url = `${apiUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(form)) params.append(k, String(v ?? ''));
    const res = await axios.post<PoEditorResponse<T>>(url, params.toString(), {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    if (res.data?.response?.status !== 'success') {
        const code = res.data?.response?.code;
        const message = res.data?.response?.message;
        throw new Error(`POEditor error: ${code} ${message}`);
    }
    return res.data.result;
};

export async function listEligibleLanguages(cfg: PullConfig) {
    const body: ApiBodyBase = {api_token: cfg.apiToken, id: cfg.projectId};
    const result = await post<{ languages?: LanguageInfo[] }>(
        cfg.apiUrl,
        'languages/list',
        body
    );
    const langs: LanguageInfo[] = result.languages ?? [];
    const minPct = cfg.minPercentage ?? 95;
    const onlyWith = cfg.onlyWithTranslations ?? true;
    return langs.filter(
        (l) => (!onlyWith || l.translations !== 0) && l.percentage >= minPct
    );
}

function capitalize(s: string) {
    return (s?.[0] || '').toUpperCase() + (s?.slice(1) || '').trim();
}

function camelize(s: string) {
    const ucFirst = capitalize(s);
    return ucFirst.replace(/\W+(.)/g, (_m, chr) => String(chr).toUpperCase().trim());
}

function camelJoinRef(reference?: string) {
    if (!reference) return '';
    const parts = reference.split('.');
    if (!parts.length) return '';
    const [first, ...rest] = parts;
    return [first.toLowerCase(), ...rest.map(capitalize)].join('');
}

function stripNamespace(term: string, reference?: string | null) {
    if (!term) return term;
    const segments = term.split('.');
    if (!reference) {
        return segments.slice(1).join('.');
    }

    const camelRef = camelJoinRef(reference);
    const firstSeg = segments[0];

    if (firstSeg?.toLowerCase() === camelRef.toLowerCase()) {
        return segments.slice(1).join('.');
    }

    if (term.startsWith(reference + '.')) {
        return term.slice(reference.length + 1);
    }

    const drop = reference.split('.').length;
    return segments.slice(drop).join('.');
}

function normalizeEntry(product: ProductTerm): NormalizedEntry {
    const translation = product.translation ?? {};
    return {
        term: product.term,
        context: product.context ?? '',
        plural: product.plural ?? '',
        created: '',
        updated: '',
        translation: {
            content: translation?.content ?? '',
            fuzzy: Number(translation?.fuzzy ?? 0),
            proofread: Number(translation?.proofread ?? 0),
            updated: '',
        },
        reference: product.reference ?? '',
        tags: Array.isArray(product.tags) ? product.tags : [],
        comment: product.comment ?? '',
    };
}

export function groupTermsByReference(terms: ProductTerm[]): GroupedTerms {
    return terms.reduce<GroupedTerms>((group, product) => {
        const groupKey = camelize(product.reference || '');
        const short = stripNamespace(product.term, product.reference);
        const itemKey = camelize(short);

        if (!group[groupKey]) group[groupKey] = {};
        group[groupKey][itemKey] = normalizeEntry(product);
        return group;
    }, {});
}

export async function pullFromPoeditor(
    cfg: PullConfig,
    langCodes?: string[]
): Promise<{
    byLang: Record<string, GroupedTerms>;
    summary: { languages: number; totalTerms: number };
}> {
    const eligible: { code: string }[] = langCodes?.length
        ? langCodes.map((code) => ({code}))
        : await listEligibleLanguages(cfg);

    const bodyBase: ApiBodyBase = {api_token: cfg.apiToken, id: cfg.projectId};

    const results = await Promise.all(
        eligible.map(async (lang) => {
            const termsRes = await post<{ terms?: ProductTerm[] }>(
                cfg.apiUrl,
                'terms/list',
                {
                    ...bodyBase,
                    language: lang.code,
                }
            );
            const terms = termsRes.terms ?? [];
            const grouped = groupTermsByReference(terms);
            return {code: lang.code, grouped, count: terms.length};
        })
    );

    const byLang: Record<string, GroupedTerms> = {};
    for (const r of results) byLang[r.code] = r.grouped;
    const total = results.reduce((acc, r) => acc + r.count, 0);

    return {byLang, summary: {languages: results.length, totalTerms: total}};
}