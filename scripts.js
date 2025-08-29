(function liveHeaderClock(){
    const $bar = document.getElementById('site-clock');
    if (!$bar) return;
    const tzAttr = ($bar.getAttribute('data-timezone') || '').trim();
    const getTZ = () => tzAttr || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const $date = $bar.querySelector('.clock-date');
    const $time = $bar.querySelector('.clock-time');

    function format() {
      const tz = getTZ();
      const now = new Date();

      const dateFmt = new Intl.DateTimeFormat(undefined, {
        timeZone: tz,
        weekday: 'short',  
        month: 'short',    
        day: '2-digit',    
        year: 'numeric'    
      });

      const timeFmt = new Intl.DateTimeFormat(undefined, {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short' 
      });

      $date.textContent = dateFmt.format(now);
      $time.textContent = timeFmt.format(now);
      $bar.title = `Time zone: ${tz}`; 
    }

    
    function start() {
      format();
      const ms = 1000 - (Date.now() % 1000);
      setTimeout(() => {
        format();
        setInterval(format, 1000);
      }, ms);
    }

    start();
  })();
  