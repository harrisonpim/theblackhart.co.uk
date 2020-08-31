---
layout: default
title: Research blog
parent_text: Home
parent_href: /
---

<div class="post-list">
    <ul>
        {% for post in site.posts %}
        <li >
            <a href="{{ post.url }}">{{ post.title }}</a>
            <time datetime="{{ post.date }}">{{ post.date | date:"%B %d, %Y" }}</time>
            <div>{{ post.excerpt }}</div>
        </li>
        {% endfor %}
    </ul>
</div>
