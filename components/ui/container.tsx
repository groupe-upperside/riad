import {cn} from '@/lib/utils/utils'
import {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode
    className?: string
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn('container mx-auto px-4', className)}>
            {children}
        </div>
    )
}