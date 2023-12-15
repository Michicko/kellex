

exports.getHome = (req, res) => {
  res.status(200).render("base", {
    title: "Benin City - Creche, Children School, High School.",
  });
};

exports.getWhoWeAre = (req, res) => {
  res.status(200).render("who-we-are", {
    title: "Who we are",
  });
};

exports.getDirectorMessage = (req, res) => {
  res.status(200).render("director-message", {
    title: "Director's message",
  });
};

exports.getSchoolPolicy = (req, res) => {
  res.status(200).render("school-policy", {
    title: "School policy",
  });
};

