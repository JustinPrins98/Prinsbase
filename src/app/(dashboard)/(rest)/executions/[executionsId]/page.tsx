import { requireAuth } from "@/lib/auth-utils";

interface Pageprops {
    params: Promise<{
        executionsId: string;
    }>
}

const Page = async ({ params }: Pageprops) => {
    await requireAuth();

    const { executionsId } = await params

    return <p>executions id: {executionsId}</p>
}

export default Page;