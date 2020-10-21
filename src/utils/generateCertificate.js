const fs = require('fs');
const htmlCreator = require('html-creator');
const HTML5ToPDF = require('html5-to-pdf');
const path = require('path');

const fileName = path.join(__dirname, 'files', 'index.html');

function generateHtml( name ) {
  const today = new Date();
  const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

  const stream = fs.createWriteStream(fileName);
  const html = new htmlCreator([
    {
        type: 'head',
        content: [{ type: 'title', content: 'Head Courses Certificate' }]
    },
    {
        type: 'body',
        attributes: { 
                      style: `
                        margin: 0px !important;
                        font-family: 'Livvic', sans-serif;
                        font-size: 14px;
                        font-weight: 100;
                      `
                    },
        content: [
          {
            type: 'img',
            attributes: { 
                          style: `
                            width: 100%;
                            height: 99vh;
                            background-repeat: no-repeat;
                            background-size: auto;
                          `,
                          src: './certificate.jpeg'
                        },
            content: [
                {
                  type: 'h1',
                  content: `${name}`,
                  attributes: { style: `
                                  position: absolute;
                                  top: 43%;
                                  left: 50%;
                                  transform: translate(-50%, -50%);
                              `},
                },
                {
                  type: 'h1',
                  content: `${date}`,
                  attributes: { style: `
                                  position: absolute;
                                  top: 74.4%;
                                  left: 50%;
                                  transform: translate(-50%, -50%);
                              `},
                },
            ],
          },
        ],
    },
  ]);
  
  stream.once('open', async (fd) => {
    await stream.end(html.renderHTML());
  });
 }

function generatePdf() {
  const run = async () => {
    const html5ToPDF = new HTML5ToPDF({
      inputPath: fileName,
      outputPath: path.join(__dirname, 'files', 'certificate.pdf'),
      templatePath: path.join(__dirname, 'files'),
      options: {
        landscape: true
      }
    });
    
    await html5ToPDF.start()
    await html5ToPDF.build()
    await html5ToPDF.close()
  };
    
  (async () => {
    try {
      await run();
      console.log("PDF - DONE");
      return true;

    } catch (error) {
      console.error(error);
      return false;
    } 
  })();
}

module.exports = {
  generate( name ) {
    (async () => {
      await generateHtml(name);
      await generatePdf();
    })();
  }
}

//generate('');