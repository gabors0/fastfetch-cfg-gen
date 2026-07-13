<script lang="ts">
	import chafaLogo from '$lib/assets/chafa.txt?raw';
	import debianAnimation from '$lib/assets/debian.gif';
	import debianLogo from '$lib/assets/debian.svg';

	let { logo }: { logo: string } = $props();
</script>

{#if logo == 'none'}
	<pre></pre>
{:else if logo == 'auto' || logo == 'builtin'}
	<pre>
          _,met$$$$$gg.
       ,g$$$$$$$$$$$$$$$P.
     ,g$$P""       """Y$$.".
    ,$$P'              `$$$.
  ',$$P       ,ggs.     `$$b:
  `d$$'     ,$P"'   .    $$$
   $$P      d$'     ,    $$P
   $$:      $$.   -    ,d$$'
   $$;      Y$b._   _,d$P'
   Y$$.    `.`"Y$$$$P"'
   `$$b      "-.__
    `Y$$b
     `Y$$.
       `$$b.
         `Y$$b.
           `"Y$b._
               `""""</pre>
{:else if logo == 'small'}
	<pre>
    _____ 
   /  __ \
  |  /    |
  |  \___-
  -_
    --_ </pre>
{:else if logo == 'file' || logo == 'file-raw'}
	<pre>
__/\\\________/\\\_______        
 _\/\\\_______\/\\\_______       
  _\/\\\_______\/\\\__/\\\_      
   _\/\\\\\\\\\\\\\\\_\///__     
    _\/\\\/////////\\\__/\\\_    
     _\/\\\_______\/\\\_\/\\\_   
      _\/\\\_______\/\\\_\/\\\_  
       _\/\\\_______\/\\\_\/\\\_ 
        _\///________\///__\///__</pre>
{:else if logo == 'data' || logo == 'data-raw'}
	Hi
{:else if logo == 'command-raw'}
	output of<br />command
{:else if logo == 'kitty' || logo == 'kitty-direct' || logo == 'sixel' || logo == 'iterm' || logo == 'raw'}
	<img src={debianLogo} alt="Debian logo" class="h-48 w-48" />
{:else if logo == 'kitty-icat'}
	<img src={debianAnimation} alt="Debian logo but animated" class="w-48" />
{:else if logo == 'chafa'}
	<pre>{chafaLogo}</pre>
{/if}
