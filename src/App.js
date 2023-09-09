// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// // routes
// import Router from './routes';
// // theme
// import ThemeProvider from './theme';
// // components
// import { StyledChart } from './components/chart';
// import ScrollToTop from './components/scroll-to-top';

// // ----------------------------------------------------------------------

// export default function App() {
//   return (
//     <HelmetProvider>
//       <BrowserRouter>
//         <ThemeProvider>
//           <ScrollToTop />
//           <StyledChart />
//           <Router />
//         </ThemeProvider>
//       </BrowserRouter>
//     </HelmetProvider>
//   );
// }
import React, { Component } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function App() {
    return (
        <div className="App">
            <h2>Using CKEditor 5 from online builder in React</h2>
            <CKEditor
                editor={ Editor }
                data="<p>Hello from CKEditor 5!</p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </div>
    )
}