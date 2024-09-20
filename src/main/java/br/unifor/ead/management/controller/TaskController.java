package br.unifor.ead.management.controller;

import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.entity.Task;
import br.unifor.ead.management.entity.User;
import br.unifor.ead.management.repository.SubjectRepository;
import br.unifor.ead.management.repository.TaskRepository;
import br.unifor.ead.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task, @RequestParam String subjectId) {
        Optional<Subject> subjectOptional = subjectRepository.findById(subjectId);

        if (subjectOptional.isPresent()) {
            Subject subject = subjectOptional.get();
            task.setSubject(subject);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();
            User user = userRepository.findByEmail(userEmail);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            task.setCreator(user);

            Task savedTask = taskRepository.save(task);
            subject.getTasks().add(savedTask);
            subjectRepository.save(subject);

            return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Subject not found", HttpStatus.BAD_REQUEST);
        }
    }
}