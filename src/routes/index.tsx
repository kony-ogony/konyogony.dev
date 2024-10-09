import type { TuonoProps } from 'tuono';

interface IndexProps {
    subtitle: string;
}

export default function IndexPage({ data, isLoading }: TuonoProps<IndexProps>): JSX.Element {
    console.log(isLoading, data);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <span className='text-3xl'>hello</span>
        </>
    );
}
