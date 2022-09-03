import { Outlet } from "@remix-run/react"
import { DefaultLayout } from "~/components/defaultLayout"

const Notes = () => {

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default Notes
