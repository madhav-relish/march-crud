'use client'

import { createTheme, MantineProvider } from "@mantine/core"

export const Provider = ({children}: {children : React.ReactNode})=>{
    const myTheme = createTheme({
        colors: {
          dark: [
            '#C9C9C9', '#b8b8b8', '#828282', '#696969', '#424242', '#3b3b3b', '#2e2e2e',
            '#020817', '#1f1f1f', '#141414'
          ],
        },
      });
return (
    <MantineProvider theme={myTheme}  forceColorScheme={'dark'}>
        {children}
    </MantineProvider>
)
}