const calculateATS = (text) => {
  const keywords = [
    "javascript",
    "react",
    "node.js",
    "express",
    "mongodb",
    "sql",
    "git",
    "github",
    "aws",
    "docker",
  ];

  const matchedKeywords = [];
  const missingKeywords = [];

  keywords.forEach((keyword) => {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const atsScore = Math.min(matchedKeywords.length * 10, 100);

  const suggestions = [];

  if (missingKeywords.includes("docker")) {
    suggestions.push("Learn and add Docker projects");
  }

  if (missingKeywords.includes("aws")) {
    suggestions.push("Add AWS cloud experience");
  }

  if (missingKeywords.includes("github")) {
    suggestions.push("Create a GitHub portfolio");
  }

  return {
    atsScore,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
};

module.exports = calculateATS;