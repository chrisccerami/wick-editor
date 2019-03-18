class GIFExport {
  /**
   * Create an animated GIF from a Wick project.
   * @param {Wick.Project} project - the Wick project to create a GIF out of.
   * @param {function} done - Callback that passes the GIF file as a blob when the GIF is done rendering.
   */
  static createAnimatedGIFFromProject (project, done) {
    // Initialize GIF.js
    let gif = new window.GIF({
      workers: 2,
      quality: 10,
      width: project.width,
      height: project.height,
      workerScript: process.env.PUBLIC_URL + "/corelibs/gif/gif.worker.js",
    });
    gif.on('finished', done);

    // Get frame images from project, add to GIF.js
    project.generateImageSequence(project, images => {
      images.forEach(image => {
        gif.addFrame(image, {delay: 1000/project.framerate});
      });
      gif.render();
    });
  }
}

export default GIFExport;