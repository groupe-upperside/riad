/** @jest-environment node */
import {GET} from '@/app/api/health/route';

it('answers the Docker health probe without requiring Mailjet credentials', async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({status: 'ok'});
});
