import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function UserInput() {
    const [url, setUrl] = useState('')
    const [email, setEmail] = useState('')
    const [display, setDisplay] = useState(false)
    const [urls, setUrls] = useState([])
    const [shortUrl, setShortUrl] = useState('')

    useEffect(() => {
        setUrls(urls);
        setShortUrl(shortUrl);
        console.log("URLS: ", urls)
        console.log("SHORT URL: ", shortUrl)
        if (urls.length !== 0)
            setDisplay(true)

    }, [urls, shortUrl, display]);


    function handleUrlChange(e) {
        setUrl(e.target.value)
    }
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    async function submit() {
        if (url === '' || email === '') {
            alert("Please enter both the fields")
        }
        else {

            console.log("URL: ", url)
            console.log("Email: ", email)
            const baseURL = "http://127.0.0.1:8000/short_url/";
            await axios.post(baseURL, {
                email: email,
                url: url
            })
                .then(async (response) => {
                    setShortUrl(response.data.short_url)
                    setUrls(response.data.urls)
                    console.log(shortUrl)
                    console.log(urls)

                })


        }

    }
    return (
        <div className='py-4'>
            <div className="d-flex justify-content-around mx-5">

                <div className="input-group mb-1 mx-3">
                    <span className="input-group-text" id="basic-addon1">Enter URL</span>
                    <input type="text" className="form-control" onChange={handleUrlChange} placeholder="URL" aria-label="Username" aria-describedby="basic-addon1" required />
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text" id="basic-addon1">Enter Email</span>
                    <input type="text" className="form-control" onChange={handleEmailChange} placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required />
                </div>
            </div>
            <button type="button" className="btn btn-primary my-4" onClick={submit}>Get URL</button>
            <div className='align-item'>{display && <div class="alert alert-primary mx-5 col-md-3 " role="alert">
                {shortUrl}
            </div>}</div>
            <div className='align-item'>
                {display ? <table class="table text-center table-striped " style={{ width: "60%" }}>
                    <th>Short URL</th>
                    <th>Main URL</th>
                    <tbody>
                        {display && urls.map((item) =>
                            <tr>
                                <td>{item.short_url}</td>
                                <td>{item.url}</td>
                            </tr>
                        )
                        }
                    </tbody>
                </table> : <></>}

            </div>
        </div>
    )
}
