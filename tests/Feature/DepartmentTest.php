<?php

namespace Tests\Feature;

use App\Department;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DepartmentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_department()
    {
        $response = $this->get("/department");
        $response->assertOk();
    }

    public function test_can_add_department()
    {
        $response = $this->post("/api/department", ['department_id' => "dep-01", 'name' => "test-department"]);
        $response->assertOk();
    }

    public function test_can_update_department()
    {
        $department = Department::first();
        $response = $this->post("/api/department/" . $department->id, ['department_id' => "dep-01", 'name' => "test-department", '_method' => "put"]);
        $response->assertOk();
    }

    public function test_can_delete_department()
    {
        $department = Department::first();
        $response = $this->delete("/api/department/" . $department->id);
        $response->assertOk();
    }
}
