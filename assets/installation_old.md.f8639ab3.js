import{_ as e,o as t,c as a,V as s}from"./chunks/framework.de2c87d6.js";const m=JSON.parse('{"title":"Old VoltaML","description":"","frontmatter":{},"headers":[],"relativePath":"installation/old.md","filePath":"installation/old.md","lastUpdated":1685388662000}'),n={name:"installation/old.md"},o=s(`<h1 id="old-voltaml" tabindex="-1">Old VoltaML <a class="header-anchor" href="#old-voltaml" aria-label="Permalink to &quot;Old VoltaML&quot;">​</a></h1><p>This section is for the old VoltaML, which is no longer maintained. It is kept here for anyone who wants to try TensorRT.</p><hr><p><img src="https://user-images.githubusercontent.com/107309002/206970939-f827f7b9-6966-41c1-a2aa-3ed18e73d399.png" alt="Screenshot from 2022-12-12 11-19-09"></p><p><img src="https://user-images.githubusercontent.com/107309002/206972269-1223c567-3df8-41c5-a7b3-f31e544b98aa.png" alt="Screenshot from 2022-12-12 11-36-37"></p><h3 id="docker-setup-if-required" tabindex="-1">Docker setup (if required) <a class="header-anchor" href="#docker-setup-if-required" aria-label="Permalink to &quot;Docker setup (if required)&quot;">​</a></h3><p>Setup docker on Ubuntu using <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer">these intructions</a>.</p><p>Setup docker on Windows using <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" rel="noreferrer">these intructions</a></p><h3 id="launch-voltaml-container" tabindex="-1">Launch voltaML container <a class="header-anchor" href="#launch-voltaml-container" aria-label="Permalink to &quot;Launch voltaML container&quot;">​</a></h3><p>Download the <a href="https://raw.githubusercontent.com/VoltaML/voltaML-fast-stable-diffusion/old/docker-compose.yml" target="_blank" rel="noreferrer">docker-compose.yml</a> file from this repo.</p><p>⚠️ Linux: Open it in a text editor and change the path of the output folder. It was configured for Windows only.</p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E06C75;">output</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">driver</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">local</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">driver_opts</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">type</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">none</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">device</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">C:\\voltaml\\output</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;"># this line</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">o</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">bind</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>Then, open a terminal in that folder and run the following command</strong></p><h4 id="linux" tabindex="-1">Linux <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux&quot;">​</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#61AFEF;">sudo</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">docker-compose</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">up</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="windows" tabindex="-1">Windows <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows&quot;">​</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#61AFEF;">docker-compose</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">up</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="how-to-use-webui" tabindex="-1">How to use webUI <a class="header-anchor" href="#how-to-use-webui" aria-label="Permalink to &quot;How to use webUI&quot;">​</a></h3><ol><li><p>Once you launch the container, a flask app will run and copy/paste the url to run the webUI on your local host. <img src="https://user-images.githubusercontent.com/107309002/206982082-ee498781-9e6d-4b80-a652-2e4e29a2835e.png" alt="Screenshot from 2022-12-12 12-36-01"></p></li><li><p>There are two backends to run the SD on, PyTorch and TensorRT (fastest version by NVIDIA).</p></li><li><p>To run on PyTorch inference, you have to select the model, the model will be downloaded (which will take a few mins) into the container and the inference will be displayed. Downloaded models will be shown as below <img src="https://user-images.githubusercontent.com/107309002/206983689-5f40f446-426b-45b7-88fa-db224099dd8e.png" alt="download_sd"></p></li><li><p>To run TensoRT inference, go to the Accelerate tab, pick a model from our model hub and click on the accelerate button. <br><img src="https://user-images.githubusercontent.com/107309002/206989892-6f04dbdf-312b-41b3-bb69-684610659fae.png" alt="Screenshot from 2022-12-12 13-17-23"></p></li><li><p>Once acceleration is done, the model will show up in your TensorRT drop down menu.</p></li><li><p>Switch your backend to TensorRT, select the model and enjoy the fastest outputs 🚀🚀</p></li></ol><h2 id="benchmark" tabindex="-1">Benchmark <a class="header-anchor" href="#benchmark" aria-label="Permalink to &quot;Benchmark&quot;">​</a></h2><p>The below benchmarks have been done for generating a 512x512 image, batch size 1 for 50 iterations.</p><table><thead><tr><th>Model</th><th>T4 (it/s)</th><th>A10 (it/s)</th><th>A100 (it/s)</th><th>4090 (it/s)</th><th>3090 (it/s)</th><th>2080Ti (it/s)</th></tr></thead><tbody><tr><td>PyTorch</td><td>4.3</td><td>8.8</td><td>15.1</td><td>19</td><td>11</td><td>8</td></tr><tr><td>Flash attention xformers</td><td>5.5</td><td>15.6</td><td>27.5</td><td>28</td><td>15.7</td><td>N/A</td></tr><tr><td>AITemplate</td><td>Not supported</td><td>26.7</td><td>55</td><td>60</td><td>N/A</td><td>Not supported</td></tr><tr><td>VoltaML(TRT-Flash)</td><td>11.4</td><td>29.2</td><td>62.8</td><td>85</td><td>44.7</td><td>26.2</td></tr></tbody></table><h3 id="⚠️-️-warnings-caveats" tabindex="-1">⚠️ ‼️ Warnings/Caveats <a class="header-anchor" href="#⚠️-️-warnings-caveats" aria-label="Permalink to &quot;⚠️ ‼️ Warnings/Caveats&quot;">​</a></h3><p><strong>This is v0.1 of the product. Things might break. A lot of improvements are on the way, so please bear with us.</strong></p><ol><li>This will only work for NVIDIA GPUs with compute capability &gt; 7.5.</li><li>Cards with less than 12GB VRAM will have issues with acceleration, due to high memory required for the conversions. We&#39;re working on resolving these in our next release.</li><li>While the model is accelerating, <strong>no other functionality will work since the GPU will be fully occupied</strong></li></ol>`,25),l=[o];function r(i,d,p,c,h,u){return t(),a("div",null,l)}const f=e(n,[["render",r]]);export{m as __pageData,f as default};
