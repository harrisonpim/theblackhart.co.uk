---
layout: default
title: page.title
parent_text: Blog
parent_href: /research-blog
description: page.excerpt
---

<div>
    <header>
        <div>
            <img src="{{ page.header_image }}" alt="{{ page.title }}" style="width:100%" />
        </div>
        <time style="color:silver">{{ page.date | date:"%B %d, %Y" }}</time>
    </header>
    <div>
        {{ content }}
    </div>
</div>
