-- Optional: backs the demo-john invitation with real Supabase data instead
-- of the in-memory fallback in lib/data/demo.ts. Not required for the
-- /welcome/demo-john route to work locally.

with new_applicant as (
  insert into applicants (name, email, role)
  values ('John Doe', 'john@example.com', 'Co-Founder')
  returning id
)
insert into invitations (applicant_id, token, meeting_date, meeting_time, personal_message, status)
select
  id,
  'demo-john',
  'Tuesday',
  '8:00 PM',
  'Throughout our conversations, we were impressed by what you bring to the table. Your skills, perspective, and ambition stood out to us, and we believe you can play a meaningful role in what we''re building.',
  'pending'
from new_applicant;
