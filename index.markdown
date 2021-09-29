---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: Paige OOO | Hike Counter
---
<h1 >Hike Counter</h1>
<h2> The Latest Year on the Road Hike Totals </h2>

<div class="js-hikeCounter hikeCounter">
   <div class="stats">
        <div class="stats-container">
           <strong class="stat-count js-hike-count">__</strong>*&nbsp;Total Hikes &nbsp;
           <strong class="stat-count js-mile-count">__</strong>&nbsp;Total Miles
        </div>
         <div class="stat-news" style="display: none;">
          <strong class="js-total-days"></strong> Days into trip! <br/>That's 1 hike every <strong class="js-hikes-per-day"></strong> days
         </div>
      </div>
   <div class="grid">
      <ul id="hexGrid">
      </ul>

      <div class="loader js-loader">
         <div class="loader-inner">
            <div class="loader-line-wrap">
               <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
               <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
               <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
               <div class="loader-line"></div>
            </div>
            <div class="loader-line-wrap">
               <div class="loader-line"></div>
            </div>
         </div>
      </div>
      <div class="stats">
        <div class="stats-container">
           <strong class="stat-count js-hike-count">__</strong>*&nbsp;Total Hikes &nbsp;
           <strong class="stat-count js-mile-count">__</strong>&nbsp;Total Miles
        </div>
         <div class="stat-news" style="display: none;">
          <strong class="js-total-days"></strong> Days into trip! <br/>That's 1 hike every <strong class="js-hikes-per-day"></strong> days
         </div>
      </div>

   </div>
</div>

<script id="hike-template"  type="text/x-handlebars-template">
  {% raw %}
    {{#each entities}}
      <li class="hex" style="display: none;">
        <div class="hexIn">
          <a class="hexLink" href="#">
            <div class='img' style='background-image:url({{photo}});'></div>
            <h5 class="demo-headline">{{count}} <br/> {{name}}</h5>
          </a>
        </div>
      </li>
    {{/each}}
  {% endraw %}
</script>

