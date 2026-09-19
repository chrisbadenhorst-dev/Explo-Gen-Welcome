-- Explo-Gen Technologies — invite the founding team
-- Run this in the Supabase SQL editor AFTER running schema.sql.
--
-- Each invitation gets a random, unguessable token (12 hex chars) instead of
-- a name-based one, so nobody can guess a teammate's link. The final SELECT
-- lists each person's link to send them.
--
-- Edit MEETING_DATE / MEETING_TIME below before running, and feel free to
-- customize personal_message per person (it's the same warm default for all
-- five right now).

with meeting as (
  select 'Tuesday'::text as meeting_date, '8:00 PM'::text as meeting_time
),
message as (
  select $msg$Throughout our conversations, we were impressed by what you bring to the table. Your skills, perspective, and ambition stood out to us, and we believe you can play a meaningful role in what we're building.$msg$::text as personal_message
),
new_applicants as (
  insert into applicants (name, role)
  values
    ('Takalani Hiliza', 'Co-Founder'),
    ('Lineo Khabane', 'Co-Founder'),
    ('Khwezi Damani', 'Co-Founder'),
    ('Marno Botha', 'Co-Founder'),
    ('Jp Slabbert', 'Co-Founder')
  returning id, name
)
insert into invitations (applicant_id, token, meeting_date, meeting_time, personal_message, status)
select
  new_applicants.id,
  encode(gen_random_bytes(6), 'hex'),
  meeting.meeting_date,
  meeting.meeting_time,
  message.personal_message,
  'pending'
from new_applicants, meeting, message;

-- Run this to see each person's invitation link (swap in your real domain):
select
  a.name,
  i.token,
  'https://yourdomain.com/welcome/' || i.token as invitation_link
from invitations i
join applicants a on a.id = i.applicant_id
order by a.name;
