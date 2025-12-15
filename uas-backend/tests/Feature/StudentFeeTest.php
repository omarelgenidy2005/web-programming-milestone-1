<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class StudentFeeTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_student_fees()
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->getJson('/api/student-fees');

        $response->assertStatus(200);
    }

    public function test_unauthorized_user_cannot_view_student_fees()
    {
        $response = $this->getJson('/api/student-fees');

        $response->assertStatus(401); // Unauthenticated
    }
}
