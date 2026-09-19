-- Reset all invitations to their original state (after testing).
-- Deletes every response and clears opened/responded tracking.

delete from responses;

update invitations
set status = 'pending',
    opened_at = null,
    responded_at = null;

select a.name, i.status, i.opened_at, i.responded_at
from invitations i
join applicants a on a.id = i.applicant_id
order by a.name;
