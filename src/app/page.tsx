import { requireAuth } from "@/lib/auth-utils"
import { createCaller } from "@/trpc/server"
import { LogoutButton } from "./logout";

const Page = async () => {
  await requireAuth();

  const caller = await createCaller()
  const data = await caller.getUsers();

  return (
    <div className="min-h-screen min-w-screen flex flex-col  gap-y-6 items-center justify-center">
      Protected server component
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <LogoutButton />
    </div>
  )
}

export default Page
