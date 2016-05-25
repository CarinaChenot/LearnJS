$(document).ready(function () {

  // Régler taille header small et big
  $(function () {
    $('header').data('size', 'big');
  });

  $(window).scroll(function () {
    if ($(document).scrollTop() > 100) {
      if ($('header').data('size') == 'big') {
        $('header').data('size', 'small');
        $('#logo a').css('font-size', '30px');
        $('#liste').html('<img src="images/list.png">');
        $('#profil').html('<img src="images/profile.png">');
        $('header').stop().animate({
          height: '50px'
        }, 100);
        $('header li').addClass('headersm');
      }
    } else {
      if ($('header').data('size') == 'small') {
        $('header').data('size', 'big');
        $('#logo a').css('font-size', '50px');
        $('header').stop().animate({
          height: '71px'
        }, 100);
        $('#liste').html('<img src="images/list.png">Liste des exercices');
        $('#profil').html('<img src="images/profile.png">Mon profil');
        $('header li').removeClass('headersm');
      }
    }
  });

  $(window).load(function () {
    var results = localStorage.getItem('results');
    if (results == null) results = new Array(exercices.length);
    else results = JSON.parse(results);
    var compteur = 0;
    for (var i = 0; i < results.length; i++) {
      if (results[i] == 1) compteur += 1;
    }
    $('#resolus').html(compteur);
    $('#restants').html(exercices.length - compteur);
  });
  // Animation du aside
  var toggle = 0

  $('#profil').click(function () {

    // Affichage du profil sur clic dans le header

    toggle = toggle + 1

    if (toggle % 2 == 1) {

      $('.aside').animate({
        left: '0px'
      }, 100);
      $('.aside p').fadeIn(200);

    } else if (toggle % 2 == 0) {

      $('.aside').animate({
        left: '-170px'
      }, 100);
      $('.aside p').fadeIn(200);
    }
  });



  $('.aside').mouseenter(function () {
    $('.aside').animate({
      left: '0px'
    }, 100);
    $('.aside p').fadeOut(200);
  });

  $('.aside').mouseleave(function () {
    $('.aside').animate({
      left: '-170px'
    }, 100);
    $('.aside p').fadeIn(200);
  });

  // scroll la page sur le bouton start
  $("#start").click(function () {
    $('html, body').animate({
      scrollTop: $("#exercice").offset().top
    }, 800);
  });

  $('#start').on('click', function () {
    nouvelexercice();
  });

  $('#suivant').on('click', function (results) {
    nouvelexercice();
  });

  $('#reset').on('click', function () {
    localStorage.removeItem('results');
    $('#resolus').html('0');
    $('#restants').html(exercices.length);
  });

  function nouvelexercice(results) {
    $('#solution').empty();
    $('#reponse').empty();
    var nombre = getTirage(exercices.length);

    var results = localStorage.getItem('results');
    if (results == null) results = new Array(exercices.length);
    else results = JSON.parse(results);

    $('#enonce').html(exercices[nombre]['Enonce']);

    $('#valider').on('click', function () {
      $('#solution').html(exercices[nombre]['Solution']);
    });

    $('#vrai').on('click', function () {
      results[nombre] = 1;
      var compteur = 0;
      for (var i = 0; i < results.length; i++) {
        if (results[i] == 1) compteur += 1;
      }
      $('#resolus').html(compteur);
      $('#restants').html(exercices.length - compteur);
      localStorage.setItem('results', JSON.stringify(results));

    });
  }

  function getTirage(limit) {
    return Math.floor(Math.random() * limit);
  }

});

//Page liste des exos


$(function () {

  var results = localStorage.getItem('results');

  results = JSON.parse(results);
  for (var i = 0; i < results.length; i++) {

    //On va chercher le premier tiers d'index pour y mettre l'énoncé de l'exo 1
    if (i < ex1.length) {
      
      if (results[i] == 1) {
        console.log("test1");
        $('#listeExo').append('<h3>Enoncé</h3></br><div>Présentation d’un algorithme présentant une problématique algorithmique. Il faut fournir un énoncé ainsi que la solution algorithmique.</div></br><div>' + exercices[i]["Enonce"] + '</div></br><div>' + exercices[i]["Solution"] + '</div></br><h4>' + exercices[i]["NOM Prenom"] + '</h4>');
      }
    }

    //On va chercher les index entre le premier et le dernier tiers pour y mettre les énoncés de l'exo 2
    else if (ex1.length < i < (ex1.length + ex2.length)) {
      
      if (results[i] == 1) {
        console.log("test2");
        $('#listeExo').append('<h3>Enoncé</h3></br><div>Présentation d’un algorithme présentant une erreur. Il faut fournir un énoncé contenant une erreur ainsi que la version corrigée.</div></br><div>' + exercices[i]["Enonce"] + '</div></br><div>' + exercices[i]["Solution"] + '</div></br><h4>' + exercices[i]["NOM Prenom"] + '</h4>');
      }
    }


    //On va chercher le dernier tiers d'index pour mettre les énoncés du 3e exo
    else if ((ex1.length + ex2.length) < i) {
      console.log("test3");
      if (results[i] == 1) {
        $('#listeExo').append('<h3>Enoncé</h3></br><div>Présentation d’un algorithme et demande à l’internaute le résultat produit par cet algorithme.</div></br><div>' + exercices[i]["Enonce"] + '</div></br><div>' + exercices[i]["Solution"] + '</div></br><h4>' + exercices[i]["NOM Prenom"] + '</h4>');
      }
    }

  }
});

//fin document.ready