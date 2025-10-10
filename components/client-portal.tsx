'use client';

import {type ReactNode, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

export default function ClientPortal({
                                         children,
                                         containerId = 'drawer-root',
                                     }: {
    children: ReactNode;
    containerId?: string;
}) {
    const [el, setEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let node = document.getElementById(containerId);
        if (!node) {
            node = document.createElement('div');
            node.id = containerId;
            document.body.appendChild(node);
        }
        setEl(node);
    }, [containerId]);

    if (!el) return null;
    return createPortal(children, el);
}
