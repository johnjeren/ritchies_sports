<article @php(post_class('my-4'))>
  <header>
    <h2 class="entry-title">
      <a href="{{ get_permalink() }}" class="text-ritchiesblue-500 text-2xl">
        {!! $title !!}
      </a>
    </h2>

    @includeWhen(get_post_type() === 'post', 'partials.entry-meta')
  </header>

  <div class="entry-summary">
    @php(the_excerpt())
  </div>
</article>
