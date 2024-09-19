package br.unifor.ead.management.controller;

import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.entity.Task;
import br.unifor.ead.management.repository.SubjectRepository;
import br.unifor.ead.management.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        Optional<Subject> subjectOptional = subjectRepository.findById(task.getSubjectId());

        if (subjectOptional.isPresent()) {
            Task savedTask = taskRepository.save(task);
            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Subject not found", HttpStatus.BAD_REQUEST);
        }
    }
}
