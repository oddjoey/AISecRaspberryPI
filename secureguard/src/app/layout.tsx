import Navbar from "@/components/Navbar";
import "./globals.css";
import "../CSS/App.css"

export default function DashboardLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body>
        <div className="App">
          <Navbar/>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}