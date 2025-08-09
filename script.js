// Year in footer (safe if element exists)
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

const form = document.getElementById('waitlistForm');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note && (note.textContent = 'Submitting…');

    try {
      const res = await fetch('https://formspree.io/f/movlyeba', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        form.reset();
        note && (note.textContent = 'Thanks! You’re on the list — we’ll email you when beta opens.');
      } else {
        let msg = 'Something went wrong. Please try again.';
        try {
          const data = await res.json();
          if (data && data.errors && data.errors[0] && data.errors[0].message) {
            msg = data.errors[0].message;
          }
        } catch {}
        note && (note.textContent = msg);
      }
    } catch {
      note && (note.textContent = 'Network error. Please try again.');
    }
  });
}
