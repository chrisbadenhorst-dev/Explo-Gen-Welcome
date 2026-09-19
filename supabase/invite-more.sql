-- Explo-Gen Technologies — invite three more people
-- Run this in the Supabase SQL editor (after schema.sql has already been run).
--
-- Edit the names below if "Chris" / "JC" / "Bernice" should be full names,
-- and edit meeting_date / meeting_time if this group isn't joining the same
-- Tuesday 8:00 PM meeting as the rest of the team.

with meeting as (
  select 'Tuesday'::text as meeting_date, '8:00 PM'::text as meeting_time
),
message as (
  select $msg$Throughout our conversations, we were impressed by what you bring to the table. Your skills, perspective, and ambition stood out to us, and we believe you can play a meaningful role in what we're building.$msg$::text as personal_message
),
new_applicants as (
  insert into applicants (name, role)
  values
    ('Chris', 'Co-Founder'),
    ('JC', 'Co-Founder'),
    ('Bernice', 'Co-Founder')
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

-- See each person's invitation link (swap in your real domain):
select
  a.name,
  i.token,
  'https://yourdomain.com/welcome/' || i.token as invitation_link
from invitations i
join applicants a on a.id = i.applicant_id
order by a.name;
