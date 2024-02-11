$(document).ready(function () {
  $(".slider").slick({
    arrows: true,
    dots: true,
    slidesToShow: 4,
    speed: 1000,
  });
  $(".popup-vimeo").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    gallery: {
      enabled: true,
    },
  });

  $(".slider-item").each(function () {
    const videoId = $(this).find(".popup-vimeo").attr("href").split("/").pop();
    const apiUrl = `https://api.vimeo.com/videos/${videoId}?fields=pictures`;

    $.ajax({
      url: apiUrl,
      type: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer 0ea41e323aae46f01a79e067306c080b"
        );
      },
      success: function (data) {
        const thumbnailUrl = data.pictures.sizes[2].link;
        $(this).find(".popup-vimeo img").attr("src", thumbnailUrl);
      }.bind(this),
      error: function (error) {
        console.error("Error fetching thumbnail", error);
      },
    });
  });
});
