module.exports = function (app, config, passport) {
  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('home',
        {
          user: req.user
        });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/login',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/login',
      })
  );

  app.post('/login/callback',
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout/callback', function (req, res) {
    res.render('logout');
  });

  app.get('/profile', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('profile',
        {
          user: req.user
        });
    } else {
      res.redirect('/login');
    }
  });

  app.get('/logout', function (req, res) {
    if (req.isAuthenticated()) {
      passport._strategy(config.passport.strategy).logout(req, function (err, redirectUrl) {
        req.logout();
        res.redirect(redirectUrl);
      });
    } else {
      res.redirect('/login');
    }
  });
};