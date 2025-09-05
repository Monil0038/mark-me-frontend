import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from './skip-to-main'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const location = useLocation()

  // Define routes where sidebar should be hidden
  const hideSidebarRoutes = ['/sign-in', '/sign-up', '/forgot-password','/otp','/sign-in-2']

  const hideSidebar = hideSidebarRoutes.includes(location.pathname)

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <SkipToMain />
      {!hideSidebar && (
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 h-full ${
          hideSidebar ? '' : isCollapsed ? 'md:ml-14' : 'md:ml-64'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
