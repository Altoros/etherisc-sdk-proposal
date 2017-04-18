# Etherisc-SDK proposal

## High-level architecture
![high-level architecture](/docs/img/scheme-02.png)

## Brief roadmap

#### v0.1 Standalone 3rd party component  (208 hours)
- Existing codebase refactoring
- 3rd party standalone component
- 3rd party "Сheck for policy" component
- Etherisc API server
- Etherisc examples

#### v0.2 3rd party component with two-steps integration and binding to external input field for premium  (28 hours)
- Two-steps integration 3rd party component
- Implement 3rd party with binding to external input field for premium

#### v0.3 3rd party component with multiple policies ordering (50 hours)
- Additional UI components

#### v0.4 Backoffice (estimate - TBD, most likely in the range of 100-200 hrs)
#### v0.5 NPM module (48 hours)
#### v0.6 Integration with Neteller (16 hours)
#### v0.7 React Native Etherisc-SDK (estimate - TBD, most likely in the range of 40-80 hrs)
#### v0.8 Raspberry Pi Etherisc-SDK (estimate - TBD, most likely in the range of 40-80 hrs)
#### v0.9 PHP Etherisc-SDK (estimate - TBD, most likely in the range of 40-160 hrs)
#### v0.10 Android Etherisc-SDK (estimate - TBD, most likely in the range of 40-160 hrs)
#### v0.11 iOS Etherisc-SDK (estimate - TBD, most likely in the range of 40-160 hrs)

## Security risks / advisory when using etherisc-SDK as 3rd party javascript module
1. Risk to lose control over changes to the application performed by 3rd party javascript. Advisory: use in-house script mirroring, sub-resource integrity (see below).
2. Execution of unknown code, so this grants the 3rd party the same privileges that were granted to the client. Advisory: to be secure the host company must review the code for any vulnerabilities like XSS or malicious actions such as sending sensitive data from the DOM, use in-house script mirroring, sub-resource integrity, sandboxing (see below).
3. Leakage of sensitive information to 3rd parties. The request includes all regular HTTP headers and 3rd party can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. Advisory: review the code, etherisc SDK doesn’t send credentials and sensitive information with its cross-origin requests.

#### Sub-resource integrity:
Generate integrity metadata for the etherisc-SDK and add it to the script element like this:
```
<script src="https://path-to-etherisc-skd.js" 
   integrity="sha384-MBO5IDfYaE6c6Aao94oZrIOiC7CGiSNE64QUbHNPhzk8Xhm0djE6QqTpL0HzTUxk"
   crossorigin="anonymous"></script>
```   

#### Sandboxing:
Put etherisc SDK into an iframe like this:
```
 <html>
   <head></head>
     <body>
       ...    
       <!-- Iframe with etherisc SDK script -->
       <iframe src="https://domain/etherisc-sdk-page.html" sandbox="allow-same-origin allow-scripts"></iframe>
   </body>
 </html>
```
