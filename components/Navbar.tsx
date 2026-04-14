import { Box } from "lucide-react"
import { useState } from "react"
import Button from "./ui/Button"
import { useOutletContext } from "react-router"

const Navbar = () => {

    const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>()

    console.log(isSignedIn && { isSignedIn, userName, signIn, signOut })
    const handleAuthClick = async () => {
        if (!isSignedIn) {
            try {
                await signIn()
                console.log(isSignedIn && { isSignedIn, userName, signIn, signOut })

            } catch (error) {
                console.log(`puter sign in failed: ${error}`)
            }
            return
        }

        try {
            await signOut()
            console.log({ isSignedIn, userName, signIn, signOut })

        } catch (error) {
            console.log(`puter sign out failed ${error}`)
        }
    }

    //rendering stuffs
    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <div className="brand">
                        <Box className="logo" />
                        <span className="brand">Zynth</span>
                    </div>
                </div>
                {/* links */}

                <ul className="links">
                    <a href="#">Product</a>
                    <a href="#">Pricing</a>
                    <a href="#">Community</a>
                    <a href="#">Enterprise</a>
                </ul>

                {/* Actions(auth) */}
                <div className="actions">
                    {isSignedIn ? (
                        <>
                            <span className="greeting">{userName ? `Hi ${userName}` : 'Signed in'}</span>

                            <Button onClick={handleAuthClick} size="sm" >Log Out</Button>
                        </>

                    ) : (<>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="login"
                            onClick={handleAuthClick}>Log in
                        </Button>
                        <a href="#upload" className="cta">Get started</a>
                    </>)}



                </div>
            </nav>
        </header>
    )
}

export default Navbar