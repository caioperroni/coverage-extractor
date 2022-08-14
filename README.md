<div align="center"> <h3> perroni ♻ tech </h3> https://perroni.tech | 2022 | MIT License  </div>

<br>

# COVERAGE EXTRACTOR

A simple script written in JS, that extracts **used parts of JS and CSS code** from coverage JSON files.<br>
Those FILES can be download after running some **coverage** [web development tool](https://en.wikipedia.org/wiki/Web_development_tools), available on most of the popular modern browsers as Chrome, Firefox and Edge.

<br>

## REQUIREMENT

- [Node.js](https://nodejs.org/) to run `extract.js`

<br>

## USAGE

```sh
node extract.js [1*] [2]
```

<br>

## PARAMETERS

1. INPUT FULL PATH + FILE NAME

   - Required
   - JSON coverage file complete path

2. OUTPUT RELATIVE PATH

   - Optional
   - Path + name of the folder that will be created **from root** to write the output files
   - Defaults to `output`

<br>

## COVERAGE TOOL

One of the [web development tools](https://en.wikipedia.org/wiki/Web_development_tools) available, among most of the popular browsers sets.<br>
You can figure out **how to use** it on the **docs linked below the quotes**.

<blockquote>
The Coverage tab in Chrome DevTools can help you find unused JavaScript and CSS code. Removing unused code can speed up your page load and save your mobile users cellular data.
</blockquote>

<div align="right">

[Chrome DevTools Docs](https://developer.chrome.com/docs/devtools/coverage/)

</div>

<blockquote>
Code coverage essentially measures how often certain lines are hit, branches taken or conditions met in a program, given some test that you run on it.
</blockquote>

<div align="right">

[Firefox DevTools Docs](https://firefox-source-docs.mozilla.org/tools/code-coverage/index.html)

</div>

<blockquote>
The Coverage tool can help you find unused JavaScript and CSS code. Removing unused code can speed up your page load and save your mobile users cellular data.
</blockquote>

<div align="right">

[Edge DevTools Docs](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/coverage/)

</div>

<br>

## SAMPLE

The [sample](./sample/) folder have a [site](./sample/site/), [inputs](./sample/inputs/) and [outputs](./sample/outputs/) that you can check out. <br>
Consider the `sample_onclick_both` in/out as they will give the most reliable result for this example.<br>

Read below important infos about each one:

<details>
<summary style="font-size: 1.5em">SITE</summary>

1. **sample.html**

   ```
   - Includes <link href="./sample.css"> and <script src="./sample.js">.
   - Defines a <style> and a <script> itself.
   ```

   - **\<style\>**

   ```
   Defines .used, .dynamic and .not-used classes.

   - .used will always be covered, as it's defined on document build.
   - .dynamic will be covered by clicking on "Add Dynamic by JS <script> tag".
   - .not-used will never be covered, as example of unused codes.
   ```

   - **\<script\>**

   ```
   Defines "load" listener to window and "addDynamic" function.

   - window.onload will always be covered.
   - "addDynamic" function will be covered by clicking on "Add Dynamic by JS <script> tag".
   ```

2. **sample.css**

   ```
   Defines .used-css, .dynamic-css and .not-used-css classes.

   - .used-css will always be covered, as it's defined on document build of "sample.js".
   - .dynamic-css will be covered by clicking on "Add Dynamic by JS file".
   - .not-used-css will never be covered, as example of unused codes.
   ```

3. **sample.js**

   ```
   Defines "load" listener to window and "addDynamicJS" function.

   - window.onload will always be covered.
   - "addDynamicJS" function will be covered by clicking on "Add Dynamic by JS file".
   ```

</details>
<details>
<summary style="font-size: 1.5em">INPUTS</summary>

The JSON you will get from coverage if:

1. **sample_onload.json**

   Downloading right after page loads, with **no interactions** covered and **unused + important** code missing if extracted.

2. **sample_onclick_doc.json**

   Downloading right after clicking _ONLY_ on **"Add Dynamic by JS < script > tag"** button, with **just one possible interaction** covered and **unused + important** code missing if extracted.

3. **sample_onclick_js.json**

   Downloading right after clicking _ONLY_ on **"Add Dynamic by JS file"** button, with **just one possible interaction** covered and **unused + important** code missing if extracted.

4. **sample_onclick_both.json**

   Downloading right after clicking on both buttons, with **all possible interactions** covered and **just unused** code missing if extracted.

</details>
<details>
<summary style="font-size: 1.5em">OUTPUTS</summary>

The result **js**, **css** and **mixed** files of extraction. Genereted by running:

1. [**sample_onload**](./sample/outputs/sample_onload/)

   ```sh
   node extract.js ./sample/inputs/sample_onload.json sample/outputs/sample_onload
   ```

2. [**sample_onclick_doc**](./sample/outputs/sample_onclick_doc/)

   ```sh
   node extract.js ./sample/inputs/sample_onclick_doc.json sample/outputs/sample_onclick_doc
   ```

3. [**sample_onclick_js**](./sample/outputs/sample_onclick_js/)

   ```sh
   node extract.js ./sample/inputs/sample_onclick_js.json sample/outputs/sample_onclick_js
   ```

4. [**sample_onclick_both**](./sample/outputs/sample_onclick_both/)

   ```sh
   node extract.js ./sample/inputs/sample_onclick_both.json sample/outputs/sample_onclick_both
   ```

</details>

<br>

## AVOID

- **Extracting minified JS bundles considering coverage**

  Unless this is really required and there is no other way, it is better **not do it**.<br>
  There are many bugs that may occur if extracting, deppending on the minifing, mangler and bundler processes used. <br>
  The limitations lies mostly on coverage tools (and what they consider a "executed" code) and the own JS grammar. <br>

  One commom problem you can face, as example, with `prototypes`:

  ```js
  // example.js
  foo.prototype.bar=function(){...};

  // can be WRONGLY extracted, causing a syntax error, as
  foo.prototype.bar=;
  ```

  This example can happen if `bar` is not called, because coverage will calculate the `ranges` considering:

  1.  `foo.prototype` as **executed code**. Therefore including also the `=;`
  2.  `bar` actual `function` definition, as **unused code**.

<br>

## TIPS

- The coverage is `recorded`, so you MUST use/test all features of your page to assure a reliable result;
- Still, code can be lost and bugs appear, so if you're planning to refactor anything considering coverage and this extractor, assure to have `backups` and do it on copied code;
- Even if your app is a Single Page App, it is better to `run the extractions individually` for each view/page or possible use case. You can analyze and merge more result codes and mitigate risks;
- Be sure to know well the architecture of your App/Site, speacially the dependencies that are not covered by this tool (3rd party mainly);
- There's no magic, but helpfull tools;
- Read more about [web vitals](https://web.dev/vitals/) and get your code even better after cleaning it :)
