const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const themeSchema = new Schema({
  themeName: String,
  layout: {
    color: {
      background: {
        type: String,
        required: true,
      },
    },
  },
  button: {
    color: {
      textColor: {
        type: String,
        required: true,
      },
      borderColor: {
        type: String,
        required: true,
      },
      hoverBorderColor: {
        type: String,
        required: true,
      },
      backgroundColor: {
        type: String,
        required: true,
      },
    },
  },
  home: {
    color: {
      headerColor: {
        type: String,
        required: true,
      },
      subheaderColor: {
        type: String,
        required: true,
      },
      profileBorder: {
        type: String,
        required: true,
      },
    },
    font: {
      headerFont: { type: String, required: true },
      subheaderFont: { type: String, required: true },
    },
  },
  postList: {
    color: {
      titleColor: { type: String, required: true },
      borderColor: { type: String, required: true },
    },
  },
  newArticle: {
    color: {
      formFieldColor: { type: String, required: true },
      formInputTextColor: { type: String, required: true },
      formFieldActiveColor: { type: String, required: true },
      formFocusBorderColor: { type: String, required: true },
    },
  },
  mainNav: {
    color: {
      textColor: { type: String, required: true },
      activeTextColor: { type: String, required: true },
      activeBorderColor: { type: String, required: true },
    },
  },
  auth: {
    color: {
      labelColor: { type: String, required: true },
      formFieldColor: { type: String, required: true },
      formInputTextColor: { type: String, required: true },
      placeholderTextColor: { type: String, required: true },
      errorMessageTextColor: { type: String, required: true },
      formFocusBorderColor: { type: String, required: false },
      formBackgroundColor: { type: String, required: true },
    },
  },
});

// interface themeInterface {
//   themeName: string;
//   layout: {
//     background: string;
//   };
//   home: {
//     headerColor: string;
//     subheaderColor: string;
//     profileBorder: string;
//   };
//   postList: {
//     titleColor: string;
//     borderColor: string;
//   };
//   newArticle: {
//     formFieldColor: string;
//     formInputTextColor: string;
//     formFocusBorder: string;
//   };
//   mainNav: {
//     navFontColor: string;
//   };
// }

// const p = path.join(path.dirname(require.main.filename), 'data', 'theme.json');

// const getThemesFromFile = (callback) => {
//   fs.readFile(p, (error, fileContent) => {
//     if (error) {
//       console.log('read error:', error);
//       return callback([]);
//     }

//     callback(JSON.parse(fileContent));
//   });
// };

// class Theme {
//   // themeName: string;
//   // layout: object;
//   // home: object;
//   // postList: object;
//   // newArticle: object;
//   // mainNav: object;
//   constructor({ themeName, layout, home, postList, newArticle, mainNav }) {
//     this.layout = layout;
//     this.home = home;
//     this.postList = postList;
//     this.newArticle = newArticle;
//     this.mainNav = mainNav;
//   }

//   static fetchAllThemes(callback) {
//     getThemesFromFile(callback);
//   }

//   save() {}
// }

module.exports = mongoose.model('Theme', themeSchema);
