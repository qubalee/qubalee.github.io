---
layout: page
icon: fas fa-highlighter
title: Recent Highlights
permalink: /highlights/
order: 9
---

<div class="highlights-archive">
  {% assign sorted_news = site.data.news | sort: 'date' | reverse %}
  {% assign last_month = '' %}

  {% for item in sorted_news %}
    {% assign current_month = item.date | date: "%B %Y" %}

    {% if current_month != last_month %}
      {% unless forloop.first %}</ul>{% endunless %}
      <h3 class="mt-4">{{ current_month }}</h3>
      <ul class="list-unstyled small mb-0">
      {% assign last_month = current_month %}
    {% endif %}

    <li class="mb-1">
      <a href="{{ item.url }}" target="_blank" rel="noopener">{{ item.title }}</a>
    </li>
  {% endfor %}
  </ul>
</div>
