var SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
      {
        path: config.passport.saml.path,
        entryPoint: config.passport.saml.entryPoint,
        issuer: config.passport.saml.issuer,
        logoutUrl: config.passport.saml.logoutUrl
      },
      function (profile, done) {
        return done(null,
          {
            id: profile.uid,
            email: profile.email,
            displayName: profile.cn,
            firstName: profile.givenName,
            lastName: profile.sn,
            profile: JSON.stringify(profile, null, 2),
            nameID: profile.nameID,
            nameIDFormat: profile.nameIDFormat
          });
      })
  );

};
