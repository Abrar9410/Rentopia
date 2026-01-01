import type { JSX } from "react";


function ProfileField({
    label,
    value,
}: {
    label: string;
    value: string | JSX.Element;
}) {
    return (
        <div className="space-y-1 text-center">
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="font-medium break-words">{value}</div>
        </div>
    );
}

export default ProfileField;