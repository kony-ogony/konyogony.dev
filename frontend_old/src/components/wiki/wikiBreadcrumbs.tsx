import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface WikiBreadcrumbsProps {
    breadcrumb: string[];
}

export const WikiBreadcrumbs = ({ breadcrumb }: WikiBreadcrumbsProps) => {
    const breadcrumbElements = useMemo(
        () =>
            breadcrumb.map((b, i) => (
                <React.Fragment key={i}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{b}</BreadcrumbPage>
                    </BreadcrumbItem>
                </React.Fragment>
            )),
        [breadcrumb],
    );
    return (
        <Breadcrumb className='not-prose mt-8 flex w-full px-[4vh] lg:px-0'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={'/'}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={'/docs'}>Docs</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbElements}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
