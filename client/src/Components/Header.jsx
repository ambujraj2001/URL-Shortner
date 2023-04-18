import React from 'react'
import www from '../assets/www.png'
export default function Header() {
    return (
        <div>
            <nav className="navbar bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand px-3" >
                        <img src={www} alt="Logo" width="30" height="24" className="d-inline-block align-text-top px-1" />
                        URL Shortener
                    </a>
                </div>
            </nav>

        </div>
    )
}
