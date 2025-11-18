import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.1/config.js";

wauthparam.auth_ws="d3NzOi8vYXBrLmZseS5kZXYvd3Mvd2hhdHNhdXRoL3B1YmxpYw==";
//wauthparam.keyword="aHR0cHM6Ly93YS5tZS82Mjg5NTgwMDAwNjAwMD90ZXh0PXdoNHQ1YXV0aDA=";
wauthparam.keyword="aHR0cHM6Ly93YS5tZS82Mjg3NzUyMDAwMzAwP3RleHQ9d2g0dDVhdXRoMA==";
wauthparam.tokencookiehourslifetime=18;
wauthparam.redirect ="/auth"
deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);
