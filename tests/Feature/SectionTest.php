<?php

namespace Tests\Feature;

use App\Department;
use App\Section;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SectionTest extends TestCase
{

    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_can_get_all_section()
    {
        $response = $this->get("/section");
        $response->assertOk();
    }

    public function test_can_add_section()
    {
        $department = Department::first();
        $response = $this->post("/api/section", ['name' => "test-name", "section_id" => "test-section", "department_id" => $department->id]);

        $response->assertOk();
    }

    public function test_can_get_a_section()
    {
        $this->withoutExceptionHandling();
        $section = Section::first();
        $response = $this->get("/api/section/" . $section->id);
        $response->assertOk();
    }

    public function test_can_update_section()
    {
        $section = Section::first();
        $department = Department::first();
        $response = $this->post("/api/section/" . $section->id, ['name' => "test-name", "section_id" => "test-section", "department_id" => $department->id, '_method' => "put"]);
        $response->assertOk();
    }

    public function test_can_delete_section()
    {
        $section = Section::first();
        $response = $this->delete("/api/section/" . $section->id);
        $response->assertOk();
    }
}
