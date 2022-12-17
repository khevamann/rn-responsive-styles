import * as React from 'react'

export type Breakpoints = [number, number, number, number]

const BreakpointsContext = React.createContext<Breakpoints>([1200, 992, 768, 540])

export const useBreakpoints = () => React.useContext(BreakpointsContext)

// Provider to allow for passing in custom props to control Responsive Styles
type Props = {
  children: React.ReactNode
  breakpoints: Breakpoints
}

export function BreakpointsProvider({ children, breakpoints }: Props) {
  return <BreakpointsContext.Provider value={breakpoints}>{children}</BreakpointsContext.Provider>
}
