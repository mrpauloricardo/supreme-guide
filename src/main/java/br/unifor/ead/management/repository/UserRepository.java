package br.unifor.ead.management.repository;

import br.unifor.ead.management.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "users", collectionResourceRel = "users")
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
