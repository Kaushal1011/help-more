(function () {
    module.exports = {
        port: 5000,
        server: "localhost",
        db_name: "helpmore",
        db_port: 27017,
        /** token expiry (in seconds) for verification of email address */
        signupJwtExipry: 84444600,
        /** token key for logged in sessions */
        sessionJwtKey: "helpsessionjwtkeysecretpjsdk",
        /** token expiry (in seconds) for logged in sessions */
        sessionJwtExpiry: 2629743,
        /** token expiry for forget password url (in seconds) */
        forgetPasswordExpiry: 84600,
        /** token expiry (in seconds) for third party api users **/
        sessionThirdPartyJwtExpiry: 31556926,
    };
})();
