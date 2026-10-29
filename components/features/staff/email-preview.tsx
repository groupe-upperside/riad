export default function EmailPreview({id}: {id: string}) {
    return (
        <iframe
            src={`/api/staff/confirmations/${encodeURIComponent(id)}/preview`}
            title="Prévisualisation de l’email de confirmation"
            sandbox=""
            referrerPolicy="no-referrer"
            className="block h-[760px] w-full rounded-lg border border-brand-beige-400 bg-white"
        />
    );
}
