import {setCookieWithExpireHour,getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/cookie.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/url.js";
import {addCSS,addScriptInHead} from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";
import {addCSSInHead,addJSInHead} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';

//window.handleCredentialResponse = gSignIn;

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const target_url="https://asia-southeast2-awangga.cloudfunctions.net/bukupedia/auth/users";

const client_id="239713755402-4hr2cva377m43rsqs2dk0c7f7cktfeph.apps.googleusercontent.com";

// Panggil fungsi untuk menambahkan elemen
appendGoogleSignin(client_id);


// Buat fungsi untuk memanggil gsi js dan menambahkan elemen div ke dalam DOM
async function appendGoogleSignin(client_id) {
    try {
        // Memuat script Google Sign-In
        await addScriptInHead("https://accounts.google.com/gsi/client");
        
        // Membuat elemen <div> untuk Google Sign-In
        const div = document.createElement("div");
        div.id = "g_id_onload";
        div.setAttribute("data-client_id", client_id);
        div.setAttribute("data-context", "signin");
        div.setAttribute("data-ux_mode", "popup");
        div.setAttribute("data-callback", "handleCredentialResponse");
        div.setAttribute("data-auto_select", "true");
        div.setAttribute("data-itp_support", "true");

        // Menambahkan elemen <div> ke dalam body
        document.body.appendChild(div);
        console.log('Google Sign-In div appended successfully!');
    } catch (error) {
        console.error('Failed to load Google Sign-In script:', error);
    }
}

// Fungsi handleCredentialResponse sebagai callback (harus ada untuk Google Sign-In)
async function handleCredentialResponse(response) {
    console.log('Credential response:', response);
    try {
        const gtoken = { token: response.credential };
        await postJSON(target_url, "login", getCookie("login"), gtoken, responsePostFunction);
    } catch (error) {
        console.error("Network or JSON parsing error:", error);
        Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "An error occurred while trying to log in. Please try again.",
        });
    }
}

  

async function gSignIn(response) {
    try {
        const gtoken = { token: response.credential };
        await postJSON(target_url, "login", getCookie("login"), gtoken, responsePostFunction);
    } catch (error) {
        console.error("Network or JSON parsing error:", error);
        Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "An error occurred while trying to log in. Please try again.",
        });
    }
}



function responsePostFunction(response) {
    if (response.status === 200 && response.data) {
        console.log(response.data);
        setCookieWithExpireHour('login',response.data.token,18);
        redirect("/dashboard");
    } else {
        console.error("Login failed:", response.data?.message || "Unknown error");
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: response.data?.message || "Anda belum terdaftar dengan login google, silahkan tap atau scan qr dahulu untuk pendaftaran.",
        }).then(() => {
            redirect("/login");
        });
    }
}
