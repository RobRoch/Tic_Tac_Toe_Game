$(document).ready(function() {
  var boardColor = "orange lighten-2";
  var player = { img: "", name: "", color: "" };
  var AI = { img: "", name: "", color: "" };
  var usedId = [];
  var points = 0;
  var move = 0;
  var isFinished = false;
  var compThinking = 1000;

  //Jaina image
  var jaina = `<img class="circle responsive-img z-depth-3 sign__image-jaina" src="./images/jaina.jpg">`;

  //Grom image
  var grom = `<img class="circle responsive-img z-depth-3 sign__image-grom" src="./images/grom.jpg">`;

  function gameStarts() {
    $(".text__choose").text("It's done.");
    $("#grom").removeClass("pulse");
    $("#jaina").removeClass("pulse");
    $("#grom").off("click");
    $("#jaina").off("click");
    compMove();
  }
  //Jaina is chosen. Setting up.
  $("#jaina").click(function() {
    $("#jaina").removeClass("s4").addClass("s7");
    $("#grom").removeClass("s4").addClass("s1");
    $(".sign__image-grom").hide();
    $(".text__fighter").text("You chose Jaina!");
    player.name = "jaina";
    player.img = jaina;
    player.color = "purple darken-4";
    AI.name = "grom";
    AI.img = grom;
    AI.color = "red darken-4";
    gameStarts();
  });

  //Grom is chosen. Setting up.
  $("#grom").click(function() {
    $("#grom").removeClass("s4").addClass("s7");
    $("#jaina").removeClass("s4").addClass("s1");
    $(".sign__image-jaina").hide();
    $(".text__fighter").text("You chose Grom!");
    player.name = "grom";
    player.img = grom;
    player.color = "red darken-4";
    AI.name = "jaina";
    AI.img = jaina;
    AI.color = "purple darken-4";
    gameStarts();
  });

  //Player click.
  $(".board__field").click(function() {
    if (move === 0 || isFinished) {
      return false;
    }
    var id = this.id;
    usedId.push(parseInt(id));
    $(".ticTacToe__section__board").addClass(
      "ticTacToe__section__board-notActive"
    );
    setTimeout(function() {
      $(".ticTacToe__section__board").removeClass(
        "ticTacToe__section__board-notActive"
      );
    }, compThinking);
    $("#" + id).html(player.img);
    $("#" + id)
      .removeClass(boardColor)
      .addClass(player.color)
      .addClass(player.name);
    $("#" + id).addClass("board__field-notActive");
    move++;
    checkStatus(player);
    compMove();
  });

  //Computer movement
  function compMove() {
    if (!isFinished) {
      setTimeout(function() {
        var id = Math.floor(Math.random() * 9);
        while (usedId.includes(id) && usedId.length < 9) {
          id = Math.floor(Math.random() * 9);
        }
        usedId.push(id);
        $("#" + id).html(AI.img);
        $("#" + id)
          .removeClass(boardColor)
          .addClass(AI.color)
          .addClass(AI.name);
        $("#" + id).addClass("board__field-notActive");
        move++;
        checkStatus(AI);
      }, compThinking);
    }
  }

  //Check if tie or win.
  function checkStatus(active) {
    var activeClass = active.name;
    switch (true) {
      case $("#0").hasClass(activeClass) &&
        $("#1").hasClass(activeClass) &&
        $("#2").hasClass(activeClass):
        won(active);
        break;
      case $("#3").hasClass(activeClass) &&
        $("#4").hasClass(activeClass) &&
        $("#5").hasClass(activeClass):
        won(active);
        break;
      case $("#6").hasClass(activeClass) &&
        $("#7").hasClass(activeClass) &&
        $("#8").hasClass(activeClass):
        won(active);
        break;
      case $("#0").hasClass(activeClass) &&
        $("#4").hasClass(activeClass) &&
        $("#8").hasClass(activeClass):
        won(active);
        break;
      case $("#2").hasClass(activeClass) &&
        $("#4").hasClass(activeClass) &&
        $("#6").hasClass(activeClass):
        won(active);
        break;
      case $("#0").hasClass(activeClass) &&
        $("#3").hasClass(activeClass) &&
        $("#6").hasClass(activeClass):
        won(active);
        break;
      case $("#1").hasClass(activeClass) &&
        $("#4").hasClass(activeClass) &&
        $("#7").hasClass(activeClass):
        won(active);
        break;
      case $("#2").hasClass(activeClass) &&
        $("#5").hasClass(activeClass) &&
        $("#8").hasClass(activeClass):
        won(active);
        break;
      default:
        draw(active);
    }
  }

  //Check if active player won.
  function won(active) {
    if (player.name == active.name) {
      $(".score").text("You won!");
      console.log("won");
      isFinished = true;
      points++;
      setTimeout(function() {
        restart(active);
      }, 3000);
    } else {
      $(".score").text("You lost!");
      console.log("lost");
      isFinished = true;
      setTimeout(function() {
        restart(active);
      }, 3000);
    }
  }

  //Finish when draw.
  function draw(active) {
    if (move == 9) {
      $(".score").text("It's a draw!");
      isFinished = true;
      setTimeout(function() {
        restart(active);
      }, 3000);
      console.log("draw");
    }
  }

  function restart(active) {
    console.log("restart");
    isFinished = false;
    usedId = [];
    move = 0;
    $(".score").text("Score: " + points);
    $(".ticTacToe__section__board > a").each(function() {
      $(this).html("");
      $(this).removeClass(player.name).removeClass(AI.name);
      $(this)
        .removeClass(player.color)
        .removeClass(AI.color)
        .addClass(boardColor);
      $(this).removeClass("board__field-notActive");
    });
    compMove();
  }
});