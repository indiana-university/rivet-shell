module.exports = function (eleventyConfig) {
  // Universal Shortcodes (Adds to Liquid, Nunjucks, Handlebars)
  eleventyConfig.addPairedShortcode('alert', function (alertContent, variant, title) {
    return `<div class="rvt-alert rvt-alert--${variant} rvt-m-tb-md">
        <div class="rvt-alert__title" id="warning-alert-title">${title}</div>
        <p class="rvt-alert__message">${alertContent}</p>
      </div>`;
  });
  
  eleventyConfig.addPassthroughCopy('src/img');
  
  return {
    dir: {
      input: 'src',
      output: 'docs'
    }
  };
}